export const getArtistNames = artist => {
    return artist.reduce((result, art_data, index) => {
		result += (index !== 0 ? ', ' : '') + art_data.name;
		
		return result;
	}, '');
};