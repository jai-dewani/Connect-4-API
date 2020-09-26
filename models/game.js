var mongoose    = require("mongoose");

var GameSchema = new mongoose.Schema({
    state: Array,
    moves: Array,
    no_of_moves: Number,
    result: String,
    status: Number,
});

module.exports = mongoose.model("Game",GameSchema);