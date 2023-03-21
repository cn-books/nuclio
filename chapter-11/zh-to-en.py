from transformers import pipeline, AutoModelWithLMHead, AutoTokenizer
def handler(context, event):
    text = event.body.decode('utf-8').strip()
    translated_text = context.user_data.translation(text, max_length=40000)[0]['translation_text']
return translated_text

def init_context(context):
    model = AutoModelWithLMHead.from_pretrained("/opt/hugging-face-data/opus-mt-zh-en")
    tokenizer = AutoTokenizer.from_pretrained("/opt/hugging-face-data/opus-mt-zh-en")
    translation = pipeline("translation_zh_to_en", model=model, tokenizer=tokenizer)
    # Create the translation pipeline"
    setattr(context.user_data, 'translation', translation)