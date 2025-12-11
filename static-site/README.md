
### Build static resume html

In getting started with the challenge, I used a draft microsoft word resume which I converted into html using chatgpt.

ChatGpt Prompts:

-> 1: Convert this resume word format to html. Use single file, proper css organization within styles element and preserve columns.

-> 2: Each of these three should be on a new line: name, contact details, summary. In experience section #details should come under #employer and not side-by side. In #education section the items should be left-aligned with 'EDUCATION'.

-> 3: Attempt to apply the heading background fill from the initial word doc. Apply the horizontal border above each section as in the word doc. Provide the full experience descriptions listed (not truncated), and using the initial font style and size.

And so on ...

Here is the resulting html after additional editing: [index.html](./index.html)

The page uses separate stylesheet page and no scripting

### Displaying the static site

#### Install local web server
To serve static files locally

```sh
npm i http-server -g
```

#### Start the server
```sh
cd static-site/
http-server
```

#### In browser: <br>
&nbsp; http://localhost:8080

-------

[Input to ChatGpt](./RESUME%20-%20Jamaal%20Ahmed.docx)
