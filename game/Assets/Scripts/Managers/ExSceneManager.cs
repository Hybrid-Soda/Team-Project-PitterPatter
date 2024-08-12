using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class ExSceneManager
{
    // 현재 씬의 BaseScene 객체 반환
    public BaseScene NowScene { get { return GameObject.FindObjectOfType<BaseScene>(); } }

    // 지정된 장면 로드
    public void LoadScene(Define.Scene type)
    {
        Managers.Coroutine.StopAllCoroutines();

        if (type != Define.Scene.ScoreScene)
            Managers.Sound.Play("SFX/SceneChange", Define.Sound.SFX);

        SceneManager.LoadScene(GetSceneName(type));
    }

    // 장면 이름 반환
    string GetSceneName(Define.Scene type)
    {
        string name = System.Enum.GetName(typeof(Define.Scene), type);
        return name;
    }
}
