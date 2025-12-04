# cloud-resume-challenge
Cloud Resume Challenge Repo

### Build resume html

Getting started with the challenge, I have an existing resume in microsoft word format which I will try to convert into html using chatgpt.

[Input to ChatGpt](./RESUME%20-%20Jamaal%20Ahmed.docx)

ChatGpt Prompts:

-> 1: Convert this resume word format to html. Use single file, proper css organization within styles element and preserve columns.

-> 2: Good. Each of these three should be on a new line: name, contact details, summary. In experience section #details should come under #employer and not side-by side. In #education section the items should be left-aligned with 'EDUCATION'.

-> 3: Better. Attempt to apply the heading background fill from the initial word doc. Apply the horizontal border above each section as in the word doc. Provide the full experience descriptions listed (not truncated), and using the initial font style and size.

... And so on

Here is resulting resume after additional editing and tweaking:

[index.html](./index.html)


### Separation of concerns
Separate stylesheet from html file

### Installing local web server
To serve static files locally as work progresses on the styling

```npm i http-server -g```

### Front End
Installed react and vite.js, not necessary as this is a simple site but adds for some good front-end hands-on practice
