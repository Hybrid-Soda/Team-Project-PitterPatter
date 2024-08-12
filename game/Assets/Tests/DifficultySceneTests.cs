using System.Collections;
using System.Collections.Generic;
using NUnit.Framework;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.TestTools;
using UnityEngine.UI;

public class DifficultySceneTests
{
    private DifficultyScene difficultyScene;
    private Button difficultyButton;

    [SetUp]
    public void Setup()
    {
        // 가상의 DifficultyScene 객체 생성
        GameObject difficultySceneObject = new GameObject();
        difficultyScene = difficultySceneObject.AddComponent<DifficultyScene>();

        // 가상의 버튼 생성 및 이름 설정 (난이도 3 버튼)
        GameObject buttonObject = new GameObject();
        difficultyButton = buttonObject.AddComponent<Button>();
        difficultyButton.name = "3"; // 난이도 3을 설정하는 버튼으로 설정
    }

    [UnityTest]
    public IEnumerator 난이도_3으로_설정하고_게임씬으로_이동()
    {
        // 초기 씬 이름 저장
        string initialSceneName = SceneManager.GetActiveScene().name;

        // SetDifficulty 메서드를 호출하여 3번 버튼을 누르는 동작 시뮬레이션
        difficultyScene.SetDifficulty(difficultyButton);

        // 씬 전환이 이루어졌는지 확인
        yield return new WaitForSeconds(0.5f);
        Assert.AreNotEqual(initialSceneName, SceneManager.GetActiveScene().name);

        // 난이도 설정이 3으로 되었는지 확인
        Assert.AreEqual(3, Managers.Play.DiffLevel);

        // 게임 씬으로 전환되었는지 확인
        Assert.AreEqual(Define.Scene.GameScene.ToString(), SceneManager.GetActiveScene().name);
    }
}
