using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class StopBtn : MonoBehaviour
{
    public GameObject stopWindow;

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Escape))
        {
            if (stopWindow.activeSelf)
            {
                OnClickContinueBtn();
            }
            else
            {
                OnClickStopBtn();
            }
        }
    }

    public void OnClickStopBtn()
    {
        Time.timeScale = 0;
        Managers.Sound.PauseBgm();
        stopWindow.SetActive(true);
    }

    public void OnClickContinueBtn()
    {
        Time.timeScale = 1;
        Managers.Sound.ResumeBgm();
        stopWindow.SetActive(false);
    }
}
