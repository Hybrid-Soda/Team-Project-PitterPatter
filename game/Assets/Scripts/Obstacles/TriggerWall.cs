using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TriggerWall : MonoBehaviour
{
    private GameScene gs;
    private float speed; // 벽 이동 속도
    private bool fin = false; // 점수 및 생명 업데이트 여부
    private float[] speeds = { 6.0f, 7.0f, 8.0f, 9.0f, 10.0f, 11.0f }; // 속도 저장 배열

    void Start()
    {
        gs = FindObjectOfType<GameScene>();
        setSpeed();
    }

    void Update()
    {
        gameObject.transform.Translate(Vector3.up * speed * Time.deltaTime); // 벽 이동

        if (!fin && transform.position.z > - 5)
        {
            if (gs == null) { return; }

            if (!gs.getPoint)
            {
                if (gs.round == 1) {
                    gs.UpdateScore();
                }
                else if (gs.round == 2) {
                    gs.UpdateScore2();
                }
            }
            else
            {
                fin = true;
                gs.getPoint = false;
            }
        }

        if (transform.position.z < -3)
        {
            Destroy(gameObject); // 벽 삭제
        }
    }

    void setSpeed()
    {
        // 난이도에 따른 벽 속도 설정
        int difficultyLevel = GameManager.Instance.difficultyLevel;
        speed = (difficultyLevel >= 1 && difficultyLevel <= 6) ? speeds[difficultyLevel - 1] : 8.0f;
    }
}
