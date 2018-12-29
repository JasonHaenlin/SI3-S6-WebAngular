# NODE-RED

**the file contain the nodes I used to test the basic of mqtt and mysql**

---

### you will need to install 2 packages for that

you can find the literature below.

* [node-red-node-mysql](https://flows.nodered.org/node/node-red-node-mysql)
* [node-red-contrib-mqtt-broker](https://flows.nodered.org/node/node-red-contrib-mqtt-broker)

## you can also download them using the `manage palette` in node-red interface.

### when the package are installed

1. Go into your node-red webApp and paste those files.

   * The one for the server is the one with mysql on it.
   * and the other one is for the client

   **you may want to only use the server one, it depend of your need and your setup**

2. Open phpmyadmin and import the sql file.
3. you might need to change the user and password in the `MYSQL` block on `node-red`. And the IPV4 address on the client Flow in the `MQTT` blocks

---
