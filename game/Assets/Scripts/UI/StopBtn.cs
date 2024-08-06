using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class StopBtn : MonoBehaviour
{
    public GameObject stopWindow;
    public void OnClickStopBtn()
    {
        Time.timeScale = 0;
        AudioManager.instance.PauseBgm();
        stopWindow.SetActive(true);
    }

    public void OnClickContinueBtn()
    {
        Time.timeScale = 1;
        AudioManager.instance.ResumeBgm();
        stopWindow.SetActive(false);
    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Escape))
    {
        if (stopWindow.activeSelf)
        {
            // stopWindow가 활성화되어 있으면 비활성화하고 게임 재개
            Time.timeScale = 1;
            AudioManager.instance.ResumeBgm();
            stopWindow.SetActive(false);
        }
        else
        {
            // stopWindow가 비활성화되어 있으면 활성화하고 게임 일시정지
            Time.timeScale = 0;
            AudioManager.instance.PauseBgm();
            stopWindow.SetActive(true);
        }
    }
    }
}
