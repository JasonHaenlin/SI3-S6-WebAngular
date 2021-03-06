﻿using System;
using System.Threading;

using EngineIO;

namespace homeIO
{
	class LightLivingRoom
	{
		//In this sample we are switching the living room light on and off 10 times.
		public LightLivingRoom()
		{ load(); }

		public void load()
		{

			//We are using a MemoryBit which we get from the MemoryMap.
			//You can find all the memory addresses at the Memory Addresses page.
			MemoryBit livingRoomLight = MemoryMap.Instance.GetBit(0, MemoryType.Output);

			for (int i = 0; i < 10; i++)
			{
				livingRoomLight.Value = !livingRoomLight.Value;

				//When using a memory value before calling the Update method we are using a cached value.
				Console.WriteLine("Light is on? " + livingRoomLight.Value);

				//Calling the Update method will write the livingRoomLight.Value to the memory map.
				MemoryMap.Instance.Update();

				Thread.Sleep(5000);
			}

			//When we no longer need the MemoryMap we should call the Dispose method to release all the allocated resources.
			MemoryMap.Instance.Dispose();

			Console.WriteLine("Press any key to exit...");
			Console.ReadKey();
		}
	}
}