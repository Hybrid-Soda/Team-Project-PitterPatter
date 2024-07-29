using UnityEngine;
using UnityEngine.SceneManagement;

public class DifficultyScene : MonoBehaviour
{
    private void ToGame()
    {
        AudioManager.instance.PlaySfx(AudioManager.Sfx.ChangeScene);
        SceneManager.LoadScene("Game");
        AudioManager.instance.PlayBgm(AudioManager.Bgm.GameBgm);
    }
    public void SetEasy()
    {
        GameManager.Instance.SetDifficulty(1);
        ToGame();
    }

    public void SetNormal()
    {
        GameManager.Instance.SetDifficulty(2);
        ToGame();
    }

    public void SetMedium()
    {
        GameManager.Instance.SetDifficulty(3);
        ToGame();
    }

    public void SetHard()
    {
        GameManager.Instance.SetDifficulty(4);
        ToGame();
    }

    public void SetVeryHard()
    {
        GameManager.Instance.SetDifficulty(5);
        ToGame();
    }

    public void SetExtreme()
    {
        GameManager.Instance.SetDifficulty(6);
        ToGame();
    }
}
