using homeIO.mqtt;
using homeIO.samples;
using System;

namespace homeIO
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");

			//only one at a time
			//HOME I/O SAMPLES

			//LightLivingRoom sm = new LightLivingRoom();
			//ThermostatLivingRoom tm = new ThermostatLivingRoom();
			//CheckEvent ce = new CheckEvent();
			//AllEventHandler av = new AllEventHandler();


			//MQT SAMPLES

			Client cl = new Client();
			cl.publishDataMqtt("[551, \"This is a strange world's end\"]");
			//cl.subscribeDataMqtt();
			//while (!Console.KeyAvailable) ;
			//cl.unsubscribeMqtt();

			//MQT & HOMEIO

			//IoMqttTest im = new IoMqttTest();
		}	
    }
}
