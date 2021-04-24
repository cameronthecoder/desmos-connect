# Desmos Pod
![Image of Desmos pod with the host role](https://i.imgur.com/DU3vitS.png)

This is a custom pod that is designed for Adobe Connect that allows you to have a fully-functioning Desmos graphing calculator right inside of your meeting. **NOTE: This pod does NOT work with the Classic view in Adobe Connect**

Features:
- Expressions
- Notes
- Participant Access
- Import from URL

Support for these features are coming soon:
- Tables
- Pictures

# Build Process
To build this project manually, follow these steps:
1. Run ``npm i`` or ``yarn`` to install the dependencies
2. Run ``npm build`` or ``yarn build`` to build the project
3. In the dist folder, rename the ``index.html`` file to ``desmos_html5.htm``
4. Compress the ``dist`` folder as a ``.zip`` 
5. Upload the ``.zip`` into into your meeting room in a empty share pod
6. Enjoy!

# Contributions
Feel free to contribute to this project if you have any feature suggestions, bug fixes, or issues :)

# Support
If you need support or want to get in touch, email me at camnooten@gmail.com.

# License
MIT