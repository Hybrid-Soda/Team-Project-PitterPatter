using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneManagerEx : MonoBehaviour
{   
    public void ChangeSceneBtn()
    {
        AudioManager.instance.PlaySfx(AudioManager.Sfx.ChangeScene);
        switch (this.gameObject.name)
        {
            case "toMainBtn":
                SceneManager.LoadScene("Main");
                break;

            case "toDifficultyBtn":
                SceneManager.LoadScene("Difficulty");
                break;

            case "toGameBtn":
                SceneManager.LoadScene("Game");
                break;

            case "toScoreBtn":
                SceneManager.LoadScene("Score");
                break;
        }
    }
}
