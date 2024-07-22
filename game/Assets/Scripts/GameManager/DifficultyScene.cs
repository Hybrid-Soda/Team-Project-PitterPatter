using UnityEngine;
using UnityEngine.SceneManagement;

public class DifficultyScene : MonoBehaviour
{
    private GameManager gm;

    void Start()
    {
        gm = GameObject.Find("GameManager").GetComponent<GameManager>();
    }

    public void SetEasy()
    {
        gm.SetDifficulty(1);
        gm.ToGame();
    }

    public void SetNormal()
    {
        gm.SetDifficulty(2);
        gm.ToGame();
    }

    public void SetMedium()
    {
        gm.SetDifficulty(3);
        gm.ToGame();
    }

    public void SetHard()
    {
        gm.SetDifficulty(4);
        gm.ToGame();
    }

    public void SetVeryHard()
    {
        gm.SetDifficulty(5);
        gm.ToGame();
    }

    public void SetExtreme()
    {
        gm.SetDifficulty(6);
        gm.ToGame();
    }
}
