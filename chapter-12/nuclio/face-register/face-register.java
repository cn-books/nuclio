import io.nuclio.Context;
import io.nuclio.Event;
import io.nuclio.EventHandler;
import io.nuclio.Response;

import com.baidu.aip.face.AipFace;
import com.baidu.aip.util.Base64Util;
import org.json.JSONObject;
import java.util.HashMap;
import java.nio.charset.StandardCharsets;
import java.lang.reflect.Field;

public class Handler implements EventHandler {

        //设置APPID/AK/SK
    private   String APP_ID = "*****";
    private   String API_KEY = "****";
    private   String SECRET_KEY = "****";
    private   AipFace client = null;
    {
        client = new AipFace(APP_ID, API_KEY, SECRET_KEY);

    }

    @Override
    public Response handleEvent(Context context, Event event) {

        context.getLogger().info("request coming...");
        byte[] byteBody = event.getBody();
        String body = new String(byteBody, StandardCharsets.UTF_8);
        com.alibaba.fastjson.JSONObject bodyObj = com.alibaba.fastjson.JSON.parseObject(body);
        String image = bodyObj.getString("image");

       //参数设置（示例下表格对参数进行介绍）
       HashMap<String, String> map = new HashMap<>();
       map.put("quality_control", "NORMAL");//图片质量
       map.put("liveness_control", "LOW");//活体检测


       JSONObject res = client.addUser(image, "BASE64", "lbn_001", "1000", map);

       return new Response().setBody(res.toString());
    }
}