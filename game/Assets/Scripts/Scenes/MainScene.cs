using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class MainScene : BaseScene
{
    void Update()
    {
        if (Input.anyKeyDown)
            Managers.Scene.LoadScene(Define.Scene.DifficultyScene);
    }
}
