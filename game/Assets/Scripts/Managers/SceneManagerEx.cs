using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneManagerEx : MonoBehaviour
{   
    public void ChangeSceneBtn()
    {
        AudioManager.instance.PlaySfx(AudioManager.Sfx.ChangeScene);
        GameManager.Instance.UnityCall(false);
        switch (this.gameObject.name)
        {
            case "toMainBtn":
                SceneManager.LoadScene("Main");
                Time.timeScale = 1;
                break;

            case "toDifficultyBtn":
                SceneManager.LoadScene("Difficulty");
                break;

            case "toGameBtn":
                SceneManager.LoadScene("Game");
                break;
        }
    }
}
