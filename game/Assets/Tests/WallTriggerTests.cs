using System.Collections;
using NUnit.Framework;
using UnityEngine;
using UnityEngine.TestTools;

public class WallTriggerTests
{
    private GameObject wallObject;
    private WallTrigger wallTrigger;
    private GameScene gameScene;
    private GameScore gameScore;

    [SetUp]
    public void Setup()
    {
        // 게임 씬과 점수 시스템의 가상 객체 생성
        GameObject gameSceneObject = new GameObject();
        gameScene = gameSceneObject.AddComponent<GameScene>();
        gameScore = new GameScore();
        wallObject = new GameObject();
        wallTrigger = wallObject.AddComponent<WallTrigger>();

        // WallTrigger에 필요한 GameScene 할당
        wallTrigger.GetType().GetField("GM", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance).SetValue(wallTrigger, gameScene);
        wallTrigger.GetType().GetField("GS", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance).SetValue(wallTrigger, gameScore);

        // 초기 위치 설정
        wallObject.transform.position = new Vector3(0, 0, 5);
    }

    [UnityTest]
    public IEnumerator 벽이_시간에_따라_아래로_이동하는지_확인()
    {
        // 첫 번째 프레임에서의 초기 위치 저장
        Vector3 initialPosition = wallObject.transform.position;
        yield return new WaitForSeconds(0.5f);

        // 벽이 움직였는지 확인
        Vector3 newPosition = wallObject.transform.position;
        Assert.Less(newPosition.z, initialPosition.z, "벽 이동 x");
    }

    [UnityTest]
    public IEnumerator 벽이_목표위치에_도달했을_때_파괴되고_점수가_업데이트되는지_확인()
    {
        // 벽을 특정 위치로 이동
        wallObject.transform.position = new Vector3(0, 0, -2);
        // Update 메서드 호출을 통해 충돌 시뮬레이션
        wallTrigger.Invoke("Update", 0f);

        // 벽이 파괴되었는지 확인
        yield return new WaitForEndOfFrame();
        Assert.IsTrue(wallObject == null, "벽 파괴 x");

        // 점수가 업데이트되었는지 확인
        Assert.AreEqual(gameScene.score, gameScore.GetType().GetField(
          "GM", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance
        ).GetValue(gameScore), "점수 업데이트 x");
    }

    [TearDown]
    public void TearDown()
    {
        // 테스트가 끝난 후 오브젝트 파괴
        if (wallObject != null)
            GameObject.Destroy(wallObject);
    }
}
