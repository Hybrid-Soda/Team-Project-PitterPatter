using System.Collections;
using System.Collections.Generic;
using NUnit.Framework;
using UnityEngine;
using UnityEngine.TestTools;

public class RoundSystemTests
{
    private GameScene gameScene;

    [SetUp]
    public void Setup()
    {
        // 가상의 GameScene 객체 생성
        GameObject gameSceneObject = new GameObject();
        gameScene = gameSceneObject.AddComponent<GameScene>();

        // 필요한 필드 초기화
        gameScene.round = 0;
        gameScene.score = 0;
        gameScene.playTime = 0;
    }

    [UnityTest]
    public IEnumerator Round1_StartsCorrectly()
    {
        // 라운드 1 시작
        gameScene.UpdateRound(new Round1());

        // 라운드가 1로 설정되었는지 확인
        Assert.AreEqual(1, gameScene.round);

        // nextTime이 적절히 설정되었는지 확인
        // Assert.AreEqual(20f, gameScene.nextTime);

        yield return null;
    }

    [UnityTest]
    public IEnumerator Round2_StartsAfterRound1()
    {
        // 라운드 1 시작
        gameScene.UpdateRound(new Round1());
        gameScene.playTime = 20f; // 라운드 1의 시간이 끝났다고 가정

        // 라운드 2로 넘어가는지 확인
        gameScene.nowRound.Update(gameScene);
        Assert.AreEqual(2, gameScene.round);

        yield return null;
    }

    [UnityTest]
    public IEnumerator Round3_StartsAfterRound2()
    {
        // 라운드 2 시작
        gameScene.UpdateRound(new Round2());
        gameScene.playTime = 40f; // 라운드 2의 시간이 끝났다고 가정

        // 라운드 3로 넘어가는지 확인
        gameScene.nowRound.Update(gameScene);
        Assert.AreEqual(3, gameScene.round);

        yield return null;
    }

    [UnityTest]
    public IEnumerator Round3_EndsCorrectly()
    {
        // 라운드 3 시작
        gameScene.UpdateRound(new Round3());
        gameScene.playTime = 50f; // 라운드 3의 시간이 끝났다고 가정

        // 라운드 3이 끝나고 클리어 화면으로 넘어가는지 확인
        gameScene.nowRound.Update(gameScene);

        // 클리어 이미지가 활성화되었는지 확인
        yield return new WaitForSeconds(3f);
        Assert.IsFalse(gameScene.clearImage.gameObject.activeSelf);

        yield return null;
    }
}

// public static class TestHelper
// {
//     // 리소스에서 프리팹 복제
//     public static GameObject InstantiateFromResource(string _PrfName)
//     {
//         return GameObject.Instantiate(Resource.Load<GameObject>(_PrfName));
//     }

//     // 씬에 배치된 모든 오브젝트 삭제 (테스트 러너 제외)
//     public static void CleanUp()
//     {
//         GameObject[] AllGameObjects = GameObject.FindObjectsOfType<GameObject>();
//         foreach (GameObject _g in AllGameObjects)
//         {
//             if (_g.name == "Code-based tests runner")
//             {
//                 // pass
//             }
//             else
//             {
//                 AllGameObjects.Destroy(_g);
//             }
//         }
//     }

//     // 테스트를 위해 씬 준비. 이전 테스트의 오브젝트들을 지우고, 카메라, 캔버스, 이벤트 시스템을 배치
//     public static void PrepareTest()
//     {
//         CleanUp();
//         InstantiateFromResource("MainCameraPrf");
//         InstantiateFromResource("EventSystemPrf");
//         InstantiateFromResource("CanvasPref");
//     }
// }