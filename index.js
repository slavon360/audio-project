const express = require('express');
const fs = require('fs');
const mm = require('musicmetadata');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');

const Tracks = require('./models/track.js');
const Artists = require('./models/artist.js');
const schema = require('./schema/schema.js');

const app = express();
const PORT = 4004;

let file_name;

const getArtistsPromises = artist_names => {
	return artist_names.map(async name => {
		try {
			const found_artists = await Artists.find({ name });

			console.log('found_artists: ', found_artists);
			if (found_artists && found_artists.length) {
				return new Promise(resolve => {
					return resolve(found_artists);
				});
			}
		} catch (error) {
			throw new Error(error);
		}

		try {
			const artist_model = new Artists({ name });

			return artist_model
				.save()
				.then(saved_data => {
					return new Promise(resolve => resolve([saved_data]));
				});
		} catch (error) {
			throw new Error(error);
		}
	});
};

const writeImage = (picture, album) => {
	const { data, format } = picture;
	const buffer = Buffer.from(data, 'base64');
	const img_file_name = `${album}.${format}`;
	
	return new Promise((resolve, reject) => {
		fs.writeFile(`./public/pictures/${img_file_name}`, buffer, (error, a) => {
			if (error) {
				return reject(error);
			} else {
				return resolve(img_file_name);
			}
		});
	});
};

mongoose.connect('mongodb://localhost/audio-project');

const storage = multer.diskStorage({
	destination (req, file, callback) {
		callback(null, './public/audio');
	},
	filename (req, file, callback) {
		console.log('file: ', file);
		file_name = file.originalname;
		callback(null, file_name);
	} 
})

app.use(cors());
app.use(express.static('public'));

const upload = multer({ storage : storage}).single('clientAudio');

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true,
}))

app.post('/add-audio', (req, res) => {
	upload(req, res, (error) => {
		if (error) {
			console.log(error);
			res.end('error');
		}
		const stream = new fs.ReadStream(`${__dirname}/public/audio/${file_name}`, { highWaterMark: 14 * 1024 });

		const parser = mm(stream, (error, metadata) => {
			if (error) {
				console.log(error);
			} else {
				console.log(metadata);
				const { artist, album, year, genre, title, picture } = metadata;
				const artist_names = artist && artist.length ? artist : ['Unknown Artist'];
				const artists_promises = getArtistsPromises(artist_names);
				const genre_data = genre.join();
				
				Promise.all(artists_promises)
					.then(([artist_data]) => {
						if (picture && picture[0]) {
							writeImage(picture[0], album)
								.then(picture_name => {
									const track = new Tracks({
										artistsIds: artist_data.map(art_t => art_t._id),
										album,
										year,
										genre: genre_data,
										title,
										fileName: file_name,
										picture: picture_name
									});

									track.save()
										.then(({ title }) => {
											res.end('file was uploaded');
										})
										.catch(error => {
											console.log(error);
										});
								})
								.catch(error => {
									throw new Error(error);
								});
						} else {
							const track = new Tracks({
								artistsIds: artist_data.map(art_t => art_t._id),
								album,
								year,
								genre: genre_data,
								title,
								fileName: file_name,
							});

							track.save()
								.then(({ title }) => {
									res.end('file was uploaded');
								})
								.catch(error => {
									console.log(error);
								});
						}
						
					})
					.catch((error) => {
						throw new Error(error);
					});

				stream.close();
			}
		});
	})
})

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));

app.listen(PORT, () => {
	console.log(`server is listening on port: ${PORT}`);
})
