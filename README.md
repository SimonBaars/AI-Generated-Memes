# AI-Generated-Memes
Generating memes using Bing AI, Stable Diffusion WebUI, and the `shitpost` CLI tool.

## Prerequisites
1. Install the [Stable Diffusion WebUI](https://github.com/AUTOMATIC1111/stable-diffusion-webui) together with any model you like, then run it with the `--api` command line option.
2. Install a CLI tool that can generate memes. Easiest is to use `shitpost` for Linux (available in the AUR and probably for Ubuntu as well). Alternatively, you could use `memegen` for MacOS ([click here for instructions](https://github.com/cmdrkeene/memegen)), but it requires slight code changes.
3. Add your `_U` Bing AI token as an environment variable named `BING_AI`. Check [here](https://github.com/waylaidwanderer/node-chatgpt-api) for more instructions.
4. Run the tool using `node src/bing-memes.js` (assuming you installed NodeJS, if not, please do :D).
5. Sell the memes on any NFT broker.
6. Stonks.

## Code structure
For this project, I opted for a single code file: `src/bing-memes.js`. I made some convenience functions for chatting with Bing, extracting its output, and generating Stable Diffusion images with the WebUI. Then I just loop semi-endlessly to make Bing generate endless memes.

## Example output
Demo output for 140 memes can be found in the `demo-output/` folder. Here are some I consider funny:
![Zoom degree meme](./demo-output/meme-0-1.png)
![Boss accident meme](./demo-output/meme-0-2.png)
![Titanic grief meme](./demo-output/meme-0-4.png)
![Goat meme](./demo-output/meme-0-7.png)
![Covid meme](./demo-output/meme-0-8.png)
![Birthday meme](./demo-output/meme-1-2.png)
![Milk badass meme](./demo-output/meme-1-3.png)
![Cool penguin meme](./demo-output/meme-1-4.png)
![Taco cat meme](./demo-output/meme-2-1.png)
![Cool dog meme](./demo-output/meme-2-5.png)
![Cool penguin meme](./demo-output/meme-2-7.png)
![Tuna sandwich meme](./demo-output/meme-3-1.png)
![Pineapple pizza meme](./demo-output/meme-3-5.png)
![Bing meme](./demo-output/meme-3-9.png)
![Hacked meme](./demo-output/meme-4-7.png)
![VR accident meme](./demo-output/meme-4-10.png)
![Sad laptop cat meme](./demo-output/meme-5-2.png)
![Coffee sadness meme](./demo-output/meme-5-4.png)
![First child meme](./demo-output/meme-5-5.png)
![Wedding meme](./demo-output/meme-5-9.png)
![Mona lisa meme](./demo-output/meme-6-3.png)
![Bread cat meme](./demo-output/meme-6-5.png)
![Skipped exam meme](./demo-output/meme-6-7.png)
![Birds and bees meme](./demo-output/meme-6-8.png)
![My fish meme](./demo-output/meme-8-7.png)
![Homework meme](./demo-output/meme-9-3.png)
![Lazy meme](./demo-output/meme-10-6.png)
![Lying to children meme](./demo-output/meme-11-2.png)
![Car doge meme](./demo-output/meme-11-3.png)
![Sliding penguin meme](./demo-output/meme-11-4.png)
![Karen meme](./demo-output/meme-11-5.png)
![Pineapple ripe meme](./demo-output/meme-11-6.png)
![Cute duck meme](./demo-output/meme-11-9.png)
![Crypto meme](./demo-output/meme-12-8.png)
![Tinder meme](./demo-output/meme-12-9.png)

## Final note
Elon open-sourcing the Twitter algorithm? Well, Elon, take this! Unlimited dank memes! You have nothing on me... except for a few billions in cash :D
