using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Runtime.InteropServices;
using UnityEngine.UI;
using TMPro;

public class UDPReceive : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void GoToUnity();

    public string data;

    void Start()
    {
        GoToUnity();
    }

    public void RecieveUnity(string poseData)
    {
        data = poseData;
    }
}