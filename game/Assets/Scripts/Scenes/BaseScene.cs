using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
public abstract class BaseScene : MonoBehaviour
{
    public Define.Scene SceneType { get; protected set; } = Define.Scene.Unknown;

    private void Awake()
    {   
        PlayBGM(this.GetType().Name);
    }

    private void PlayBGM(string sceneName)
    {
        switch (sceneName)
        {
            case "MainScene":
                Managers.Sound.Play("BGM/MainBgm", Define.Sound.BGM);
                break;
            case "GameScene":
                Managers.Sound.Play("BGM/GameBgm", Define.Sound.BGM);
                break;
            case "ScoreScene":
                Managers.Sound.Clear();
                break;
            default:
                break;
        }
    }
}
