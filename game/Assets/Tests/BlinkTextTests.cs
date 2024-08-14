using System.Collections;
using NUnit.Framework;
using UnityEngine;
using UnityEngine.TestTools;
using UnityEngine.UI;

public class BlinkTextTests
{
    private GameObject textObject;
    private BlinkText blinkText;
    private Text uiText;

    [SetUp]
    public void Setup()
    {
        // 텍스트 오브젝트 생성 및 BlinkText 컴포넌트 추가
        textObject = new GameObject();
        uiText = textObject.AddComponent<Text>();
        blinkText = textObject.AddComponent<BlinkText>();

        // 초기 알파값 설정
        uiText.color = new Color(1, 1, 1, 1);
    }

    [UnityTest]
    public IEnumerator 메인화면_글자_깜박임_테스트()
    {
        // 첫 번째 프레임에서의 알파값 저장과 그 사이에 알파값이 변해야 함을 확인
        float initialAlpha = uiText.color.a;
        yield return new WaitForSeconds(0.5f);
        float newAlpha = uiText.color.a;

        // 1초 동안 대기하여 알파값이 다시 원래 값으로 돌아오는지 확인
        Assert.AreNotEqual(initialAlpha, newAlpha, "안깜박인다");
        yield return new WaitForSeconds(1f);
        Assert.AreNotEqual(newAlpha, uiText.color.a, "안깜박인다");
    }

    [TearDown]
    public void TearDown()
    {
        // 테스트가 끝난 후 오브젝트 파괴
        GameObject.Destroy(textObject);
    }
}
