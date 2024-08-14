using System.Collections;
using System.Collections.Generic;
using NUnit.Framework;
using UnityEngine;
using UnityEngine.TestTools;
using UnityEngine.UI;

public class ScoreSystemTests
{
    private GameScene gameScene;
    private GameScore gameScore;

    [SetUp]
    public void SetUp()
    {
        // 구성 요소 초기화
        GameObject gameSceneObject = new GameObject();
        gameScene = gameSceneObject.AddComponent<GameScene>();

        gameScene.clearImage = new GameObject().AddComponent<Image>();
        gameScene.roundImage = new GameObject().AddComponent<Image>();
        gameScene.countImage = new GameObject().AddComponent<Image>();

        gameScene.playTimeTxt = new GameObject().AddComponent<Text>();
        gameScene.scoreImage = new GameObject().AddComponent<Image>();
        gameScene.scoreTxt = new GameObject().AddComponent<Text>();

        gameScene.colliders = new List<GameObject>();
        gameScene.countSprites = new Sprite[3];
        gameScene.scoreSprites = new Sprite[3];

        gameScore = new GameScore();
    }

    [TearDown]
    public void TearDown()
    {
        foreach (GameObject obj in Object.FindObjectsOfType<GameObject>())
        {
            Object.Destroy(obj);
        }
    }

    [UnityTest]
    public IEnumerator 라운드1_정상적으로_시작됨()
    {
        // 라운드가 1로 설정되었는지 확인
        yield return new WaitForSeconds(0.1f);
        Assert.AreEqual(1, gameScene.round);
    }

    [UnityTest]
    public IEnumerator 충돌_시_점수_증가_확인()
    {
        // Arrange
        gameScene.colliders.Add(new GameObject("Collider1"));
        gameScene.colliders.Add(new GameObject("Collider2"));
        gameScene.colliders.Add(new GameObject("Collider3"));

        int initialScore = gameScene.score;

        // Act
        gameScore.UpdateScore(gameScene);
        int updatedScore = gameScene.score;

        // Assert
        Assert.Greater(updatedScore, initialScore, "점수가 증가하지 않았습니다.");
        yield return null;
    }

    [UnityTest]
    public IEnumerator 점수에_따른_피드백_확인_10점()
    {
        // Arrange
        for (int i = 0; i <= 10; i++)
        {
            gameScene.colliders.Add(new GameObject($"Collider{i}"));
        }

        // Act
        gameScore.UpdateScore(gameScene);
        yield return new WaitForSeconds(2f);

        // Assert
        Assert.AreEqual(gameScene.scoreSprites[0], gameScene.scoreImage.sprite, "피드백 이미지 표시 x");
        yield return new WaitForSeconds(1f);
        Assert.IsFalse(gameScene.scoreImage.gameObject.activeSelf, "피드백 이미지 비활성화 x");
    }

    [UnityTest]
    public IEnumerator 점수에_따른_피드백_확인_5점()
    {
        // Arrange
        for (int i = 0; i <= 6; i++)
        {
            gameScene.colliders.Add(new GameObject($"Collider{i}"));
        }

        // Act
        gameScore.UpdateScore(gameScene);
        yield return new WaitForSeconds(2f);

        // Assert
        Assert.AreEqual(gameScene.scoreSprites[1], gameScene.scoreImage.sprite, "피드백 이미지 표시 x");
        yield return new WaitForSeconds(1f);
        Assert.IsFalse(gameScene.scoreImage.gameObject.activeSelf, "피드백 이미지 비활성화 x");
    }

    [UnityTest]
    public IEnumerator 점수에_따른_피드백_확인_3점()
    {
        // Arrange
        for (int i = 0; i <= 3; i++)
        {
            gameScene.colliders.Add(new GameObject($"Collider{i}"));
        }

        // Act
        gameScore.UpdateScore(gameScene);
        yield return new WaitForSeconds(2f);

        // Assert
        Assert.AreEqual(gameScene.scoreSprites[2], gameScene.scoreImage.sprite, "피드백 이미지 표시 x");
        yield return new WaitForSeconds(1f);
        Assert.IsFalse(gameScene.scoreImage.gameObject.activeSelf, "피드백 이미지 비활성화 x");
    }

    [UnityTest]
    public IEnumerator 점수에_따른_피드백_확인_0점()
    {
        // Act
        gameScore.UpdateScore(gameScene);
        yield return new WaitForSeconds(1.6f);

        // Assert
        Assert.IsNull(gameScene.scoreImage.sprite, "피드백 이미지가 잘못 표시되었습니다.");
    }
}
