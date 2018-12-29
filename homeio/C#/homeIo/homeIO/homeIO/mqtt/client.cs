using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using uPLibrary.Networking.M2Mqtt;
using uPLibrary.Networking.M2Mqtt.Messages;

namespace homeIO.mqtt
{
	class Client
	{
		private static String add = "jareon.ddns.net";
		MqttClient client;
		public Client() { load(); }

		public void load()
		{
			//configure the connection to the broker MQTT
			client = new MqttClient(add, 8080, false, new X509Certificate(), null , MqttSslProtocols.None); //default port : 1883
			client.ProtocolVersion = MqttProtocolVersion.Version_3_1;
			byte code = client.Connect(Guid.NewGuid().ToString(),
										"root", "root", false,
										MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE,
										true, " ", " ", true, 60);
		}
		public void unsubscribeMqtt()
		{
			client.MqttMsgUnsubscribed += client_MqttMsgUnsubscribed;
			ushort msgId = client.Unsubscribe(new string[] { "/topic_1", "/topic_2" });
			client.ConnectionClosed += client_ConnectionClosed;
			client.Disconnect();
		}

		public void subscribeDataMqtt()
		{
			client.MqttMsgPublishReceived += client_MqttMsgPublishReceived;
			ushort msgId = client.Subscribe(new string[] { "fifo", "mqtt" },
			new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE,
			MqttMsgBase.QOS_LEVEL_AT_LEAST_ONCE });
		}

		public void publishDataMqtt(String data)
		{
			//publish to the MQTT broker with "fifo" topic
			client.MqttMsgPublished += client_MqttMsgPublished;
			ushort msgId = client.Publish("fifo", // topic
										  Encoding.UTF8.GetBytes(data), // message body
										  MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, // QoS level
										  false); // retained
		}
		private void client_ConnectionClosed(object sender, EventArgs e)
		{
			Debug.WriteLine("desconnect");
		}
		void client_MqttMsgUnsubscribed(object sender, MqttMsgUnsubscribedEventArgs e)
		{
			Debug.WriteLine("Unsubscribed for id = " + e.MessageId);
		}
		void client_MqttMsgPublishReceived(object sender, MqttMsgPublishEventArgs e)
		{
			Debug.WriteLine("Received = " + Encoding.UTF8.GetString(e.Message) + " on topic " + e.Topic);
		}
		void client_MqttMsgPublished(object sender, MqttMsgPublishedEventArgs e)
		{
			Debug.WriteLine("MessageId = " + e.MessageId + " Published = " + e.IsPublished);
		}
		void client_MqttMsgSubscribed(object sender, MqttMsgSubscribedEventArgs e)
		{
			Debug.WriteLine("Subscribed for id = " + e.MessageId);
		}

	}
}

