
const tagColor = (tag) => {
  switch (tag) {
    case 'ux':
      return 'bg-green-100 text-green-600';
    case 'dev':
      return 'bg-yellow-100 text-yellow-600';
    case 'promote':
      return 'bg-purple-100 text-red-600';
    default:
      return 'bg-gray-100 text-gray-500';
  }
};

const TagPills = ({tags}) => {
  const tagStr: String = tags+" ";//"ux,promote,dev";
  
    const tagSplit = tagStr.split(',');
    const renderTags = tagSplit.map(tag => 
    { 
      return(
         <div key={tag} className={`inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${tagColor(tag)}`}>
          {tag}
        </div>
      )
    })
    return (
      <div>
        {renderTags}
      </div>
    )
}

export default TagPills