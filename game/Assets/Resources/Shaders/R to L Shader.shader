Shader "Custom/RtoLShader"
{
    Properties
    {
        _Color ("Color", Color) = (0, 0, 0, 1) // 색상을 입력으로 받도록 속성 추가
    }
    SubShader
    {
        Tags { "RenderType"="Transparent" }  // Transparent로 변경하여 투명도를 적용할 수 있도록 함
        LOD 100

        Blend SrcAlpha OneMinusSrcAlpha // 알파 블렌딩을 활성화하여 투명도를 관리

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag

            #include "UnityCG.cginc"

            struct appdata
            {
                float4 vertex : POSITION;
                float2 uv : TEXCOORD0;
            };
            
            struct v2f
            {
                float2 uv : TEXCOORD0;
                float4 vertex : SV_POSITION;
            };

            fixed4 _Color; // 색상 변수 선언

            v2f vert (appdata v)
            {
                v2f o;
                o.vertex = UnityObjectToClipPos(v.vertex);
                o.uv = v.uv;
                return o;
            }

            fixed4 frag (v2f i) : SV_Target
            {
                // 오른쪽에서 왼쪽으로 점차 투명
                float alpha = 0.95 - pow((1.0 - i.uv.x), 4.0) * 0.95; // i.uv.x가 1에서 0으로 이동함에 따라 알파값이 0.6에서 0으로 변화
                return fixed4(_Color.rgb, alpha); // 사용자가 지정한 색상에 알파값을 적용
            }
            ENDCG
        }
    }
}