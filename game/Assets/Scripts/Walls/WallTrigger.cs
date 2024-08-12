using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WallTrigger : MonoBehaviour
{
    private readonly float[] moveSpeeds = { 6.0f, 7.0f, 8.0f, 9.0f, 10.0f, 11.0f };
    private GameScene GM;
    private GameScore GS;
    private float moveSpeed;
    
    private void Start()
    {
        GM = FindObjectOfType<GameScene>();
        GS = new GameScore();
        SetMoveSpeed();
    }

    private void Update()
    {
        // 이동
        transform.Translate(moveSpeed * Time.deltaTime * Vector3.up);
        
        // 충돌 체크
        if (transform.position.z <= -1.5)
        {
            GS.UpdateScore(GM);
            Destroy(gameObject);
        }
    }

    // 이동 속도 설정
    private void SetMoveSpeed()
    {
        int diffLevel = Managers.Play.DiffLevel;
        moveSpeed = GM.round == 1 ? moveSpeeds[diffLevel - 1] : moveSpeeds[diffLevel - 1] + 1.0f;
    }
}
