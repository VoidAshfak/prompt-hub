import Prompt from "@/models/prompt.model";
import { connectToDB } from "@/utils/db";

export const GET = async (req, {params}) => {
    const {id} = await params
    try {
        await connectToDB();
        
        const prompts = await Prompt.find({
            creator: id.toString()
        }).populate("creator");

        return new Response(JSON.stringify(prompts), {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch prompts", {status: 500})
    }
}