using UnityEngine;
using UnityEngine.SceneManagement;

public class DifficultyScene : MonoBehaviour
{
    public void SetEasy()
    {
        GameManager.Instance.SetDifficulty(1);
        GameManager.Instance.ToGame();
    }

    public void SetNormal()
    {
        GameManager.Instance.SetDifficulty(2);
        GameManager.Instance.ToGame();
    }

    public void SetMedium()
    {
        GameManager.Instance.SetDifficulty(3);
        GameManager.Instance.ToGame();
    }

    public void SetHard()
    {
        GameManager.Instance.SetDifficulty(4);
        GameManager.Instance.ToGame();
    }

    public void SetVeryHard()
    {
        GameManager.Instance.SetDifficulty(5);
        GameManager.Instance.ToGame();
    }

    public void SetExtreme()
    {
        GameManager.Instance.SetDifficulty(6);
        GameManager.Instance.ToGame();
    }
}
