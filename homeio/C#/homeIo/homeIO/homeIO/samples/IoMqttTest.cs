using EngineIO;
using homeIO.mqtt;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;

namespace homeIO.samples
{
    class IoMqttTest
    {
		private CheckEvent ce;
		private Client cl;
		public IoMqttTest()
		{
			cl = new Client();
			load();
		}

		public void load()
		{
			//Registering on the events
			MemoryMap.Instance.InputsValueChanged += new MemoriesChangedEventHandler(Instance_InputsValueChanged);

			Console.WriteLine("Press any key to exit...");

			//Calling the Update method will fire events if any memory value or name changed.
			//In this case we are updating the MemoryMap each 16 milliseconds (the typical update rate of Home I/O).
			while (!Console.KeyAvailable)
			{
				MemoryMap.Instance.Update();

				Thread.Sleep(16);
			}

			//When we no longer need the MemoryMap we should call the Dispose method to release all the allocated resources.
			MemoryMap.Instance.Dispose();
		}

		void Instance_InputsValueChanged(MemoryMap sender, MemoriesChangedEventArgs value)
		{
			//Display any changed MemoryBit
			foreach (MemoryBit mem in value.MemoriesBit)
			{
				Console.WriteLine("Input Bit (" + mem.Address + ") has changed to : " + mem.Value);
				cl.publishDataMqtt("["+mem.Address+ ",\"" + mem.Value+ "\"]");

			}
		}

	}

}
