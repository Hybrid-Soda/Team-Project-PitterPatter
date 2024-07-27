using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class StopBtn : MonoBehaviour
{
    public GameObject stopWindow;
    public void OnClickStopBtn()
    {
        Time.timeScale = 0;
        stopWindow.SetActive(true);
    }

    public void OnClickContinueBtn()
    {
        Time.timeScale = 1;
        stopWindow.SetActive(false);
        
    }
}
