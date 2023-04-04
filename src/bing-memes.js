// Hi there!
// As you may notice, code quality is not great! This is a script made for fun, so give me some slack :D
// Anywaysssss... enjoy!

import { BingAIClient } from '@waylaidwanderer/chatgpt-api';
import { writeFile } from 'fs/promises';
import { promisify } from 'util';
import { exec } from 'child_process';

const run = promisify(exec);
const outputFolder = "output/";

// I am a good Bing
async function bingChat(clientState, message) {
    let client = clientState[0];
    let context = clientState[1];
    let counter = clientState[2];
    let clientOptions = clientState[3];
    let response;
    if(counter === 1 || counter > 18) {
        counter = 0;
        client = new BingAIClient(clientOptions);
        response = await client.sendMessage(message, {toneStyle: 'creative'});
    } else {
        response = await client.sendMessage(message, context);
    }
    context = {
        conversationSignature: response.conversationSignature,
        conversationId: response.conversationId,
        clientId: response.clientId,
        invocationId: response.invocationId,
    };
    if(!response.response) {
        try {
            console.log(response.details.adaptiveCards[0].body[0].text);
            counter = -1;
        } catch(e) {}
    }
    return {state: [client, context, counter + 1, clientOptions], response: response.response, raw: response};
}

function extractJson(str) {
    str = str.replace("```json", "```");
    const codeStart = str.indexOf("```") + 3;
    const codeEnd = str.lastIndexOf("```");
    if(codeStart === -1 || codeStart === codeEnd) { // If there is no codeblock, we hope the entire response to be valid JSON
        return JSON.parse(str);
    }
    return JSON.parse(str.substring(codeStart, codeEnd));
}

async function stableDiffusion(prompt) {
    const payload = {
        "prompt": prompt,
        "steps": 20,
    };
    res = await fetch("http://127.0.0.1:7861/sdapi/v1/txt2img", {
      "body": JSON.stringify(payload),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      "method": "POST"
    });
    return Buffer.from((await res.json()).images[0], 'base64');
}

let clientState = [null, null, 1, {
    userToken: process.env.BING_AI,
    debug: false,
}];
for(let x = 1; x<=1000; x++) {
    // Construct question
    let question;
    if(clientState[2] === 1) { // New convo
        question = "Generate 10 memes and return them in JSON format and respond with JSON code ONLY. The JSON object has a key \"memes\", which contains a list with objects. Each of those objects has a key \"image\" containing a DALL-E prompt for an image for the meme. They have a key \"top\" for the top text of the meme. They have a key \"bottom\" for the bottom text of the meme. Make sure every single meme generated is funny and original. Make the memes diverse, such that every unique meme has a different kind of joke that is funny in a different way.";
    } else { // Continue convo
        question = "The memes are very similar. Generate 10 more memes that differ greatly from each other, but are all very funny.";
    }

    // Chat with Bing, with retry mechanism
    let res;
    for(let i = 0; i<10; i++) {
        res = await bingChat(clientState, question);
        clientState = res["state"];
        if(res["response"]) {
            break;
        }
        console.log("Failed, try "+(i+1)+"/10");
    }
    console.log(res["response"]);

    // Extract JSON, with retry if invalid response
    let json;
    try {
        json = extractJson(res["response"]);
        writeFile(outputFolder+"json-"+x+'.json', res["response"]);
    } catch (e) {
        clientState[2] = 1;
        continue;
    }
    console.log(json["memes"].length + " memes received");

    // Turn the Bing AI result into memes
    let id = 0;
    for (const meme of json["memes"]){
        id++;
        console.log("Generating image: "+meme["image"]);
        stableDiffusion(meme["image"]);
        writeFile(outputFolder+"image-"+x+"-"+id+'.png', image);
        try {
            console.log(await run("shitpost -f "+outputFolder+"image-"+x+"-"+id+".png -t \""+meme["top"].replace("\"", "")+"\" -b \""+meme["bottom"].replace("\"", "")+"\" -o "+outputFolder+"/meme-"+x+"-"+id+".png"));
        } catch (e) {
            console.log(e);
        }
    }
}
