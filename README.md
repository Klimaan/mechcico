# mechcico
Tool to compare environmental impact of electrical appliances

Originally developed by [Designosource](https://designosource.be/), 
a project of [Thomas More Mechelen](https://www.thomasmore.be/).

More about the MechCiCo project on: https://klimaan.be/project/mechcico/

This tool should be run on a webserver, to load the javascript files correctly.
A simple [Node.js](https://nodejs.org/en/) http server suffice.

```
npm install http-server -g
http-server
```

The style.css is a version where color variables are replaced.
The original file can be found style.css.src. Which is most likely a scss/sass file,
but this needs **to be** confirmed by the developers and also properly documented.