using System.Collections;
using System.Collections.Generic;
using NUnit.Framework;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.TestTools;

public class MainSceneTests
{
    private MainScene mainScene;

    [SetUp]
    public void Setup()
    {
        // 가상의 MainScene 객체 생성
        GameObject mainSceneObject = new GameObject();
        mainScene = mainSceneObject.AddComponent<MainScene>();
    }

    [UnityTest]
    public IEnumerator 아무키나_누르면_난이도_선택씬으로_넘어감()
    {
        // 초기 씬 이름 저장
        string initialSceneName = SceneManager.GetActiveScene().name;

        // 아무 키나 누르는 동작 시뮬레이션
        yield return new WaitForSeconds(0.5f);
        mainScene.LoadNextScene();

        // 씬 전환이 이루어졌는지 확인
        yield return new WaitForSeconds(0.5f);
        Assert.AreNotEqual(initialSceneName, SceneManager.GetActiveScene().name);
        
        // 난이도 선택 씬으로 전환했는지 확인
        yield return new WaitForSeconds(0.5f);
        Assert.AreEqual("DifficultyScene", SceneManager.GetActiveScene().name);
    }
}
