using System.Collections.Generic;
using System.Collections;
using NUnit.Framework;
using UnityEngine;
using UnityEngine.TestTools;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class RoundSystemTests
{
    private GameScene gameScene;

    [SetUp]
    public void Setup()
    {
        // 가상의 GameScene 객체 생성
        GameObject gameSceneObject = new GameObject();
        gameScene = gameSceneObject.AddComponent<GameScene>();

        // 필요한 UI 요소들을 가상으로 생성하고 초기화
        gameScene.scoreTxt = new GameObject().AddComponent<Text>();
        gameScene.playTimeTxt = new GameObject().AddComponent<Text>();
        gameScene.clearImage = new GameObject().AddComponent<Image>();
        gameScene.roundImage = new GameObject().AddComponent<Image>();
        gameScene.scoreImage = new GameObject().AddComponent<Image>();
        gameScene.countImage = new GameObject().AddComponent<Image>();
        gameScene.countSprites = new Sprite[3];

        // 필요한 필드 초기화
        gameScene.round = 0;
        gameScene.score = 0;
        gameScene.playTime = 0;
    }

    [UnityTest]
    public IEnumerator 라운드1_정상적으로_시작됨()
    {
        // 라운드가 1로 설정되었는지 확인
        yield return new WaitForSeconds(0.1f);
        Assert.AreEqual(1, gameScene.round);
    }

    [UnityTest]
    public IEnumerator 라운드1_이후에_라운드2가_시작됨()
    {
        // 라운드 1의 시간이 끝났다고 가정
        gameScene.playTime = 20f;

        // 라운드 2로 넘어가는지 확인
        gameScene.nowRound.Update(gameScene);
        yield return new WaitForSeconds(0.1f);
        Assert.AreEqual(2, gameScene.round);
    }

    [UnityTest]
    public IEnumerator 라운드2_이후에_라운드3가_시작됨()
    {
        // 라운드 2 시작
        gameScene.UpdateRound(new Round2());

        // 라운드 2의 시간이 끝났다고 가정
        gameScene.playTime = 40f;

        // 라운드 3로 넘어가는지 확인
        gameScene.nowRound.Update(gameScene);
        Assert.AreEqual(3, gameScene.round);

        yield return null;
    }

    [UnityTest]
    public IEnumerator 라운드3_종료_및_클리어_화면_전환_확인()
    {
        // 라운드 3 시작
        gameScene.UpdateRound(new Round3());

        // 라운드 3의 시간이 끝났다고 가정
        gameScene.playTime = 50f;

        // Round3의 Update를 호출하여 Clear 코루틴이 실행되도록 함
        gameScene.nowRound.Update(gameScene);

        // 클리어 이미지가 활성화되었는지 확인
        yield return new WaitForSeconds(0.3f);
        Assert.IsTrue(gameScene.clearImage.gameObject.activeSelf);

        // 3초 후 스코어 씬으로 전환되었는지 확인
        yield return new WaitForSeconds(3.3f);
        Assert.AreEqual("ScoreScene", SceneManager.GetActiveScene().name);
    }
}
