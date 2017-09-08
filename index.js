#!/usr/bin/env node

var fs = require("fs");

const FOLDER_PATH = process.argv[2];
const MODULE_NAME = process.argv[3];


fs.readdir(FOLDER_PATH, function(err, items) {
  let slugArray = [];

  items.forEach((file) => {
    slugArray.push(`${file.replace('.', '_')}: require('${FOLDER_PATH + file}')`);
    // push as string
  });


  let assetsFileContent = `// import this file for static assets
  let Obj = {
    ${slugArray.join(', ')}
  }
  export default Obj;
  `;

  fs.writeFile (MODULE_NAME, assetsFileContent, function(err) {
      if (err) throw err;
      console.log('Pre-require');
      console.log('===========');
      console.log('Created module for required assets from ', FOLDER_PATH);
      console.log('Output file is: ' + MODULE_NAME);
  });

});