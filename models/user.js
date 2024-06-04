import mongoose from '@utils/database'

const { Schema, model, models } = mongoose


const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!']
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?=.{5,50}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 5-50 alphanumeric letters and be unique!"]
    },
    image: {
        type: String
    }
})

const User = models.User || model("User", UserSchema)

export default User