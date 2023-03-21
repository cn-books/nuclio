from transformers import pipeline, AutoModelWithLMHead, AutoTokenizer
def handler(context, event):
    text = event.body.decode('utf-8').strip()
    translated_text = context.user_data.translation(text, max_length=40000)[0]['translation_text']
    return translated_text

def init_context(context):
    model = AutoModelWithLMHead.from_pretrained("/opt/hugging-face-data/opus-mt-en-zh")
    tokenizer = AutoTokenizer.from_pretrained("/opt/hugging-face-data/opus-mt-en-zh")
    translation = pipeline("translation_en_to_zh", model=model, tokenizer=tokenizer)
    # Create the translation pipeline"
    setattr(context.user_data, 'translation', translation)