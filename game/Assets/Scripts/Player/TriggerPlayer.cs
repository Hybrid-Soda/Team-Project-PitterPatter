using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerTrigger : MonoBehaviour
{
    private GameScene gs;

    void Start()
    {
        gs = GameObject.Find("GameManager").GetComponent<GameScene>(); // GameScene 컴포넌트 가져오기
    }

    private void OnTriggerEnter(Collider other)
    {
        // 오브젝트가 아직 목록에 없고 태그가 동일한 경우 목록에 추가
        if (!gs.colliders.Contains(other.gameObject) && other.gameObject.tag == gameObject.tag)
        {
            gs.colliders.Add(other.gameObject); // 오브젝트 추가
            Debug.Log(other.gameObject.tag + "_touch"); // 디버그 로그 출력
        }
    }

    private void OnTriggerExit(Collider other)
    {
        // 오브젝트를 목록에서 제거
        gs.colliders.Remove(other.gameObject);
    }
}
