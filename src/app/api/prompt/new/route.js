import { connectToDB } from "@/utils/db"
import Prompt from "@/models/prompt.model";

export const POST = async (req, res) => {
    const {prompt, userId, tag} = await req.json();
    try {
        await connectToDB();
        
        const promptCreated = await Prompt.create({
            creator: userId,
            prompt,
            tag
        })

        if(promptCreated) {
            console.log(promptCreated);
        }

        return new Response(JSON.stringify(promptCreated), {
            status: 201
        })

    } catch (error) {
        console.log(error);
        return new Response("Failed to create a new prompt", {status: 500});
    }
}