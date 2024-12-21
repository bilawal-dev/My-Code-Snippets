import mongoose from "mongoose";

const Snippet = {
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    isFavourite: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}

const SnippetsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    snippets: {
        type: [Snippet],
        default: [],
    },
    tags: {
        type: [String],
        default: [],
    },
})

const SnippetsModel = mongoose.models.SnippetsModel || mongoose.model('SnippetsModel', SnippetsSchema);

export default SnippetsModel;