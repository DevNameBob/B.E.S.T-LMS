import { useState } from 'react';
import ClassesHeader from '../../components/ClassesHeader';
import TopTabs from '../../components/TopTabs';
import SecondaryTabs from '../../components/SecondaryTabs';
import SubjectCards from '../../components/SubjectCards';
import SubjectDetail from '../../components/SubjectDetail';
import ChatRoomList from '../../components/chat/ChatRoomList';
import ChatRoomView from '../../components/chat/ChatRoomView';

export default function Classes() {
  const [activeTab, setActiveTab] = useState('subjects');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleBack = () => {
    if (activeTab === 'subjects') {
      setSelectedSubject(null);
    } else {
      setSelectedChatRoom(null);
    }
  };

  return (
    <div>
      <ClassesHeader />
      <TopTabs />
      <SecondaryTabs onTabChange={handleTabChange} />

      {activeTab === 'subjects' ? (
        selectedSubject ? (
          <SubjectDetail subject={selectedSubject} onBack={handleBack} />
        ) : (
          <SubjectCards onSelect={setSelectedSubject} />
        )
      ) : selectedChatRoom ? (
        <ChatRoomView room={selectedChatRoom} onBack={handleBack} />
      ) : (
        <ChatRoomList onSelect={setSelectedChatRoom} />
      )}
    </div>
  );
}