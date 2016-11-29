
<!--#echo json="package.json" key="name" underline="=" -->
detect-boring-package-pmb
=========================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Guess whether an npm package is a boring, semi-empty placeholder.
<!--/#echo -->



Usage
-----

(Fictional example manifests, not from real packages on npm.)

```bash
$ ./cli.sh doc/example/*.json
@ doc/example/oh-really2@0.0.1.json { private: false,
  description: 'Just in case npm runs out of placeholder packags' }
_ doc/example/oh-really-lite-0.0.1.json: boring
```


<!--#toc stop="scan" -->


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
