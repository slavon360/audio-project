const graphql = require('graphql');
const Tracks = require('../models/track.js');
const Artists = require('../models/artist.js');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLID
} = graphql;

const ArtistType = new GraphQLObjectType({
    name: 'Artist',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) }
    })
});

const TrackType = new GraphQLObjectType({
    name: 'Track',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: new GraphQLNonNull(GraphQLString) },
        artist: {
            type: GraphQLList(ArtistType),
            resolve({ artistsIds }, args) {
                return Artists.find({_id: { $in: artistsIds }});
            }
        },
        album: { type: GraphQLString },
        year: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        rate: { type: GraphQLInt },
        fileName: { type: new GraphQLNonNull(GraphQLString) }
    })
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        tracks: {
            type: new GraphQLList(TrackType),
            args: { },
            resolve(parent, queries) {
                return Tracks.find();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: Query
    // mutation: Mutation,
});