using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class MainScene : MonoBehaviour
{
    void Start()
    {
        AudioManager.instance.StopBgm();
        AudioManager.instance.PlayBgm(AudioManager.Bgm.MainBgm);
    }
    void Update()
    {
        if (Input.anyKeyDown)
        {
            SceneManager.LoadScene("Difficulty");
            AudioManager.instance.PlaySfx(AudioManager.Sfx.ChangeScene);
        }
    }
}
