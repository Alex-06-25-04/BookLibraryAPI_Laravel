export const attachNavigation = (router, { selector, dataAttr, baseUrl }) => {
    document.querySelectorAll(selector).forEach(card => {
        card?.addEventListener('click', () => {
            const cardId = card.dataset[dataAttr];
            router.navigate(`${baseUrl}/${cardId}`);
        });
    });
};