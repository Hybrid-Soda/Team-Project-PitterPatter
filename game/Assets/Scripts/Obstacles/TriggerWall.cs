using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TriggerWall : MonoBehaviour
{
    private GameScene gs;
    private float speed; // 벽 이동 속도
    private bool fin = false; // 점수 및 생명 업데이트 여부

    void Start()
    {
        gs = GameObject.Find("GameManager").GetComponent<GameScene>();

        // 난이도에 따른 벽 속도 설정
        switch (GameManager.Instance.difficultyLevel)
        {
            case 1:
                speed = 6.0f; // 쉬운 난이도
                break;
            case 2:
                speed = 7.0f; // 보통 난이도
                break;
            case 3:
                speed = 8.0f; // 중간 난이도
                break;
            case 4:
                speed = 9.0f; // 조금 어려운 난이도
                break;
            case 5:
                speed = 11.0f; // 어려운 난이도
                break;
            case 6:
                speed = 15.0f; // 매우 어려운 난이도
                break;
            default:
                speed = 8.0f; // 기본값
                break;
        }
    }

    void Update()
    {
        gameObject.transform.Translate(Vector3.up * speed * Time.deltaTime); // 벽 이동

        if (!fin && transform.position.z > -15)
        {
            if (gs != null)
            {
                if (!gs.getPoint)
                {
                    gs.UpdateScore(); // 점수 업데이트
                }
                if (gs.getPoint)
                {
                    fin = true;
                    gs.getPoint = false;
                }
            }
            else
            {
                Debug.LogWarning("GameScene reference is null.");
            }
        }

        if (transform.position.z > 10)
        {
            Destroy(gameObject); // 벽 삭제
        }
    }
}
