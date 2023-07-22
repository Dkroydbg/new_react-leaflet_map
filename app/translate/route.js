import { NextResponse } from "next/server";
import { exec } from "child_process";

export async function POST(req,res) {
	const { dateFrom,dateTo } = await req.json();

	const translatedTextPromise = new Promise((resolve, reject) => {
		exec(
			`python emitter.py ${dateFrom} ${dateTo}`,
			(error, stdout, stderr) => {
				if (error) {
					console.error(`exec error: ${error}`);
					reject(error);
				}
                console.log(`stdout: ${stdout}`);
				resolve(stdout);
			}
		);
	});
  
	const translatedText = await translatedTextPromise;
    console.log("translated text:", translatedText);
    // NextResponse.json({ translatedText });
	return NextResponse.json({ translatedText });
}