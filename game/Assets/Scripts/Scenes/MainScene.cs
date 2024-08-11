using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class MainScene : BaseScene
{
    void Update()
    {
        if (Input.anyKeyDown)
        {
            LoadNextScene();
        }
    }

    public void LoadNextScene()
    {
        Managers.Scene.LoadScene(Define.Scene.DifficultyScene);
    }
}
