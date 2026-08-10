export type KidsTopic = {
  id: string;
  label: string;
  emoji: string;
  tint: "sun" | "sky" | "leaf" | "berry" | "candy";
  prompt: string;
  reply: string;
};

export type StoryCard = {
  id: string;
  title: string;
  emoji: string;
  tint: "sun" | "sky" | "leaf" | "berry" | "candy";
  pages: string[];
};

export const kidsWelcome =
  "अरे वाह! नमस्ते चिड़िया रानी 🌸 मैं हूँ तुम्हारा Dhruv Bhaiya. आज क्या करें — कहानी सुनोगे, गिनती सीखोगे, या कोई मज़ेदार सवाल पूछोगे?";

export const kidsTopics: KidsTopic[] = [
  {
    id: "story",
    label: "कहानी सुनाओ",
    emoji: "📖",
    tint: "berry",
    prompt: "Bhaiya, kahani sunao!",
    reply:
      "अरे वाह! कहानी सुनोगे? नीचे वाली रंग-बिरंगी किताबों में से कोई एक चुनो, फिर मैं तुम्हें पूरी कहानी पढ़कर सुनाऊँगा। 📚",
  },
  {
    id: "counting",
    label: "गिनती सीखें",
    emoji: "🔢",
    tint: "sky",
    prompt: "Counting sikhao",
    reply:
      "चलो मेरे साथ बोलो — एक, दो, तीन, चार, पाँच! शाबाश! अब अपनी उँगलियाँ गिनो, कितनी हुईं? ✋ पाँच! एकदम सही, बहुत बढ़िया!",
  },
  {
    id: "abc",
    label: "A B C",
    emoji: "🔤",
    tint: "sun",
    prompt: "ABC sikhao",
    reply:
      "A for Aam 🥭, B for Billi 🐱, C for Chidiya 🐦! अब तुम बोलो — A के बाद कौन सा अक्षर आता है? हाँ जी, B! एकदम सही!",
  },
  {
    id: "animals",
    label: "जानवर",
    emoji: "🐘",
    tint: "leaf",
    prompt: "Animals ke baare mein batao",
    reply:
      "हाथी बोलता है — बर्रऽऽ! 🐘 कुत्ता बोलता है — भौं भौं! 🐶 और बिल्ली? म्याऊँ! अब तुम बताओ, गाय क्या बोलती है? 🐄",
  },
  {
    id: "rhyme",
    label: "कविता गाओ",
    emoji: "🎵",
    tint: "candy",
    prompt: "Kavita gao",
    reply:
      "मछली जल की रानी है, जीवन उसका पानी है! 🐟 हाथ लगाओ डर जाएगी, बाहर निकालो मर जाएगी। अब मेरे साथ गाओ, ज़ोर से! 🎶",
  },
  {
    id: "colors",
    label: "रंग सीखें",
    emoji: "🎨",
    tint: "sun",
    prompt: "Colors sikhao",
    reply:
      "आसमान का रंग नीला 💙, पत्ते का रंग हरा 💚, और सूरज का रंग पीला 💛! अब बताओ, टमाटर किस रंग का होता है? 🍅",
  },
];

export const kidsStories: StoryCard[] = [
  {
    id: "chidiya",
    title: "चिड़िया रानी की उड़ान",
    emoji: "🐦",
    tint: "sky",
    pages: [
      "एक छोटी सी चिड़िया रानी थी। उसका घोंसला आम के पेड़ पर था। 🌳",
      "एक दिन उसने सोचा — आज मैं बादलों तक उड़ूँगी! और वो फुर्र से उड़ चली। ☁️",
      "रास्ते में तेज़ हवा आई, पर चिड़िया रानी डरी नहीं। उसने पंख और ज़ोर से फैलाए। 💨",
      "शाम को वो अपने घोंसले लौटी और बोली — कोशिश करने से हर सपना पूरा होता है! 🌟",
    ],
  },
  {
    id: "hathi",
    title: "हाथी और चींटी की दोस्ती",
    emoji: "🐘",
    tint: "leaf",
    pages: [
      "जंगल में एक बड़ा हाथी रहता था, और एक नन्हीं सी चींटी। 🐜",
      "हाथी हँसा — तुम तो कितनी छोटी हो! चींटी बोली — छोटा होना कमज़ोर होना नहीं है।",
      "एक दिन हाथी के कान में मच्छर घुस गया, चींटी ने उसे भगा दिया। 🦟",
      "हाथी बोला — अरे वाह! सच में, दोस्ती में छोटा-बड़ा कुछ नहीं होता। 💚",
    ],
  },
  {
    id: "chand",
    title: "चंदा मामा की चाँदनी",
    emoji: "🌙",
    tint: "berry",
    pages: [
      "रात को चंदा मामा आसमान में मुस्कुराते हैं। 🌙",
      "एक बच्ची ने पूछा — मामा, आप हर रोज़ छोटे-बड़े क्यों होते हो?",
      "चंदा बोले — क्योंकि मैं सूरज की रोशनी से चमकता हूँ, और धीरे-धीरे घूमता हूँ। ☀️",
      "बच्ची ताली बजाकर बोली — अरे वाह! अब मुझे समझ आ गया! 👏",
    ],
  },
  {
    id: "aam",
    title: "मीठे आम का पेड़",
    emoji: "🥭",
    tint: "sun",
    pages: [
      "दादी ने आँगन में एक आम की गुठली बोई। 🌱",
      "रोज़ पानी दिया, धूप दिखाई, और इंतज़ार किया।",
      "कई साल बाद वो नन्हा पौधा बड़ा पेड़ बन गया। 🌳",
      "अब पूरा मोहल्ला मीठे आम खाता है — सब्र का फल हमेशा मीठा होता है! 🥭",
    ],
  },
];

const kidsFallbacks = [
  "अरे वाह! बहुत अच्छा सवाल पूछा तुमने। चलो इसे आसान बनाते हैं — पहले बताओ, तुम्हें इसमें सबसे मज़ेदार क्या लगता है?",
  "शाबाश चिड़िया रानी! तुम बहुत होशियार हो। थोड़ा सोचो और मुझे अपना जवाब बताओ, मैं यहीं हूँ। 🌸",
  "बहुत बढ़िया! चलो एक छोटी सी कहानी से समझते हैं — कहानी सुनोगे? 📖",
];

export function kidsReply(question: string): string {
  const q = question.toLowerCase();
  const matched = kidsTopics.find(
    (topic) => q.includes(topic.id) || q.includes(topic.label) || q.includes(topic.prompt.toLowerCase()),
  );
  if (matched) return matched.reply;
  if (q.includes("kahani") || q.includes("story") || q.includes("कहानी")) return kidsTopics[0]!.reply;
  if (/[0-9]|count|ginti|गिनती/.test(q)) return kidsTopics[1]!.reply;
  const index = Math.abs(question.length) % kidsFallbacks.length;
  return kidsFallbacks[index]!;
}

export function speakHindi(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "hi-IN";
  utterance.rate = 0.92;
  utterance.pitch = 1.15;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
}
